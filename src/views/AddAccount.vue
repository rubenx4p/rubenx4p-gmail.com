<template>
  <v-form>
    <v-toolbar color="primary" dark>
      <v-btn icon large to="/home">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-text-field
            v-model="accountName"
            :error-messages="nameErrors"
            required
            autofocus
            type="text"
            label="Name"
            @input="$v.accountName.$touch()"
            @blur="$v.accountName.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            required
            type="text"
            label="Username or email"
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            append-outer-icon="mdi-key-variant"
            required
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            @click:append="showPassword = !showPassword"
            @click:append-outer="generate"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-text-field
            v-model="key"
            :error-messages="keyErrors"
            :append-icon="showKey ? 'mdi-eye' : 'mdi-eye-off'"
            required
            :type="showKey ? 'text' : 'password'"
            label="Key"
            @click:append="showKey = !showKey"
            @input="$v.key.$touch()"
            @blur="$v.key.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col class="col-sm-5">
          <v-btn @click="addAccount" v-show="!id" :loading="loading" color="primary">add account</v-btn>
          <v-btn @click="save" v-show="!!id" :loading="loading" color="primary">save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import { generatePassword } from '@/utils/index'

export default {
  name: 'AddAccount',
  mixins: [validationMixin],
  validations: {
    accountName: {
      required
    },
    username: {
      required
    },
    password: {
      required
    },
    key: {
      required
    }
  },
  methods: {
    addAccount() {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.$store.dispatch('addAccount/tryAddAccount')
      }
    },
    save() {
      this.$v.$touch()
      if (!this.$v.$error) {
        this.$store.dispatch('addAccount/trySave')
      }
    },
    generate() {
      this.password = generatePassword()
    }
  },
  computed: {
    ...mapState('addAccount', ['loading', 'id']),
    accountName: {
      get() {
        return this.$store.state.addAccount.accountName
      },
      set(value) {
        this.$store.commit('addAccount/setName', value)
      }
    },
    username: {
      get() {
        return this.$store.state.addAccount.username
      },
      set(value) {
        this.$store.commit('addAccount/setUsername', value)
      }
    },
    password: {
      get() {
        return this.$store.state.addAccount.password
      },
      set(value) {
        this.$store.commit('addAccount/setPassword', value)
      }
    },
    showPassword: {
      get() {
        return this.$store.state.addAccount.showPassword
      },
      set(value) {
        this.$store.commit('addAccount/setShowPassword', value)
      }
    },
    key: {
      get() {
        return this.$store.state.addAccount.key
      },
      set(value) {
        this.$store.commit('addAccount/setKey', value)
      }
    },
    showKey: {
      get() {
        return this.$store.state.addAccount.showKey
      },
      set(value) {
        this.$store.commit('addAccount/setShowKey', value)
      }
    },
    nameErrors() {
      const errors = []
      if (!this.$v.accountName.$dirty) return errors
      !this.$v.accountName.required && errors.push('Name is required')
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    keyErrors() {
      const errors = []
      if (!this.$v.key.$dirty) return errors
      !this.$v.key.required && errors.push('Key is required')
      return errors
    }
  },
  watch: {
    '$route.params.id': {
      handler: function(id) {
        this.$store.commit('addAccount/resetState')

        if (id) {
          this.$store.dispatch('addAccount/getAccountData', id)
        }
      },
      immediate: true
    }
  }
}
</script>
