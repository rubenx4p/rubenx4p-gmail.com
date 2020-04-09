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
          <div class="headline onBackground--text">Forgot your password?</div>
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
          <v-btn color="primary" :loading="fetching" :disabled="fetching" @click="resetPassword(email)"
            >reset password</v-btn
          >
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
import { mapState, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'forgotPassword',
  created() {
    this.$store.commit('forgotPassword/resetState')
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    ...mapActions('forgotPassword', ['resetPassword'])
  },
  computed: {
    email: {
      get() {
        return this.$store.state.forgotPassword.email
      },
      set(value) {
        this.$store.commit('forgotPassword/setEmail', value)
      }
    },
    ...mapState('forgotPassword', ['fetching']),
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
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
