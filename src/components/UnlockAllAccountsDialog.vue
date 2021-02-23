<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="show"
        :fullscreen="fullscreen"
        max-width="360"
        hide-overlay
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-card-title>Unlock all Accounts</v-card-title>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Key</v-list-item-title>
                <v-text-field
                  v-model="key"
                  autofocus
                  :error-messages="keyErrors"
                  :append-icon="showKey ? 'mdi-eye' : 'mdi-eye-off'"
                  required
                  :type="showKey ? 'text' : 'password'"
                  label="Enter your key"
                  @click:append="showKey = !showKey"
                  @keyup.enter="tryActionOnAccount"
                  @input="$v.key.$touch()"
                  @blur="$v.key.$touch()"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item-action class="d-flex flex-row mx-3">
              <v-btn class="mx-2" color="primary" @click="resetState">cancel</v-btn>
              <v-btn class="mx-2" color="info" @click="tryActionOnAccount" :loading="loading">unlock</v-btn>
            </v-list-item-action>
          </v-list>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Dialog',
  mixins: [validationMixin],
  validations: {
    key: {
      minLength: minLength(8),
      required
    }
  },
  props: {
    fullscreen: {
      type: Boolean
    }
  },
  methods: {
    ...mapMutations('unlockAllAccountsDialog', ['resetState']),
    ...mapActions('unlockAllAccountsDialog', ['madeAction']),
    valid() {
      this.$v.$touch()
      return !this.$v.$error
    },
    tryActionOnAccount() {
      if (this.valid()) {
        this.madeAction()
      }
    }
  },
  computed: {
    ...mapState('unlockAllAccountsDialog', ['loading']),
    keyErrors() {
      const errors = []
      if (!this.$v.key.$dirty) return errors
      !this.$v.key.minLength && errors.push('Key must be at least 8 characters')
      !this.$v.key.required && errors.push('Key is required')
      return errors
    },
    show: {
      get() {
        return this.$store.state.unlockAllAccountsDialog.show
      },
      set(value) {
        this.$store.commit('unlockAllAccountsDialog/setShow', value)
      }
    },
    showKey: {
      get() {
        return this.$store.state.unlockAllAccountsDialog.showKey
      },
      set(value) {
        this.$store.commit('unlockAllAccountsDialog/setShowKey', value)
      }
    },
    key: {
      get() {
        return this.$store.state.unlockAllAccountsDialog.key
      },
      set(value) {
        this.$store.commit('unlockAllAccountsDialog/setKey', value)
      }
    }
  },
  watch: {
    show() {
      this.$v.$reset()
    }
  }
}
</script>
<style lang="scss" scoped></style>
