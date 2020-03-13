<template>
  <v-form>
    <v-container fluid>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <div class="headline">Reset your password</div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <div class="body-2">If you reset your password, all your accounts will be deleted</div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            required
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            hint="This password will be the key for retriving all your account passwords"
            @click:append="showPassword = !showPassword"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-text-field
            v-model="repeatPassword"
            :error-messages="repeatPasswordErrors"
            :append-icon="showRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
            required
            :type="showRepeatPassword ? 'text' : 'password'"
            label="Repeat password"
            @click:append="showRepeatPassword = !showRepeatPassword"
            @input="$v.repeatPassword.$touch()"
            @blur="$v.repeatPassword.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-btn color="primary" @click="resetPassword" :loading="fetching" :disabled="fetching">reset password</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-row>
            <v-col class="">
              <router-link to="/login">Login</router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'resetPassword',
  created() {
    this.$store.commit('resetPassword/resetState')
  },
  mixins: [validationMixin],
  validations: {
    password: {
      minLength: minLength(8),
      required
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async resetPassword() {
      this.$v.$touch()

      if (!this.$v.$error) {
        await this.$store.dispatch('resetPassword/resetPassword')
      }
    }
  },
  computed: {
    ...mapState('resetPassword', ['fetching']),
    password: {
      get() {
        return this.$store.state.resetPassword.password
      },
      set(value) {
        this.$store.commit('resetPassword/setPassword', value)
      }
    },
    repeatPassword: {
      get() {
        return this.$store.state.resetPassword.repeatPassword
      },
      set(value) {
        this.$store.commit('resetPassword/setRepeatPassword', value)
      }
    },
    showPassword: {
      get() {
        return this.$store.state.resetPassword.showPassword
      },
      set(value) {
        this.$store.commit('resetPassword/setShowPassword', value)
      }
    },
    showRepeatPassword: {
      get() {
        return this.$store.state.resetPassword.showRepeatPassword
      },
      set(value) {
        this.$store.commit('resetPassword/setShowRepeatPassword', value)
      }
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    repeatPasswordErrors() {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword && errors.push('Passwords must be identical')
      return errors
    }
  }
}
</script>
