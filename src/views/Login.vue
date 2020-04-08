<template>
  <v-form>
    <v-container fluid>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <img class="symbol" src="@/assets/symbol.png" />
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
            @click:append="showPassword = !showPassword"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-btn color="primary" @click="login" :loading="fetching" :disabled="fetching">Login</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-row>
            <v-col class="">
              <router-link to="/forgot-password">Forgot your password</router-link>
            </v-col>
            <v-col class="">
              <router-link to="/register">Register</router-link>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar">
      {{ msg }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
export default {
  name: 'login',
  created() {
    this.$store.commit('login/resetState')
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    },
    password: {
      minLength: minLength(8),
      required
    }
  },
  methods: {
    login() {
      this.$v.$touch()
      if (!this.$v.$error) {
        const { email, password } = this
        this.$store.dispatch('login/tryLogin', { email, password })
      }
    }
  },
  computed: {
    ...mapState('login', ['fetching', 'msg']),
    snackbar: {
      get() {
        return this.$store.state.login.snackbar
      },
      set(value) {
        this.$store.commit('login/snackbar', value)
      }
    },
    email: {
      get() {
        return this.$store.state.login.email
      },
      set(value) {
        this.$store.commit('login/setEmail', value)
      }
    },
    password: {
      get() {
        return this.$store.state.login.password
      },
      set(value) {
        this.$store.commit('login/setPassword', value)
      }
    },
    showPassword: {
      get() {
        return this.$store.state.login.showPassword
      },
      set(value) {
        this.$store.commit('login/setShowPassword', value)
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.symbol {
  width: 100%;
}
</style>
