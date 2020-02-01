<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="email" :rules="[rules.validEmail]" type="email" label="Email"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="password"
            :append-icon="true ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min, rules.max]"
            :type="showPassword ? 'text' : 'password'"
            name="input-10-1"
            label="Normal with hint text"
            hint="At least 8 characters"
            counter
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-btn color="primary" @click="submit">submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'login',
  components: {},
  data() {
    return {
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        max: v => v.length <= 16 || 'Max 16 characters',
        validEmail: v => this.validEmail(v) || 'Inccorect'
      }
    }
  },
  methods: {
    validEmail: email => {
      console.log('asdfsdf')
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return re.test(email)
    },
    submit: () => {
      console.log('submit')
    }
  },
  computed: {
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
    }
  }
}
</script>
