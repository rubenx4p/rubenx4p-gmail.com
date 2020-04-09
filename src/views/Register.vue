<template>
  <v-form>
    <v-container fluid>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <img class="symbol" src="@/assets/logo-long-2.png" />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            required
            type="text"
            label="Name"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            required
            type="email"
            label="Email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
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
          <v-btn color="primary" @click="register" :loading="fetching" :disabled="fetching">Register</v-btn>
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: 'register',
  created() {
    this.$store.commit('register/resetState')
  },
  mixins: [validationMixin],
  validations: {
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      minLength: minLength(8),
      required
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async register() {
      this.$v.$touch()
      if (!this.$v.$error) {
        await this.$store.dispatch('register/register')
      }
    }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.register.name
      },
      set(value) {
        this.$store.commit('register/setName', value)
      }
    },
    email: {
      get() {
        return this.$store.state.register.email
      },
      set(value) {
        this.$store.commit('register/setEmail', value)
      }
    },
    password: {
      get() {
        return this.$store.state.register.password
      },
      set(value) {
        this.$store.commit('register/setPassword', value)
      }
    },
    repeatPassword: {
      get() {
        return this.$store.state.register.repeatPassword
      },
      set(value) {
        this.$store.commit('register/setRepeatPassword', value)
      }
    },
    showPassword: {
      get() {
        return this.$store.state.register.showPassword
      },
      set(value) {
        this.$store.commit('register/setShowPassword', value)
      }
    },
    showRepeatPassword: {
      get() {
        return this.$store.state.register.showRepeatPassword
      },
      set(value) {
        this.$store.commit('register/setShowRepeatPassword', value)
      }
    },
    ...mapState('register', ['fetching']),
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
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

<style lang="scss" scoped>
.symbol {
  width: 100%;
}
</style>
