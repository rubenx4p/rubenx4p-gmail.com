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
          <v-card-title>{{ title }}</v-card-title>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>Account details</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Account</v-list-item-title>
                <v-list-item-subtitle>{{ accountName }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Username</v-list-item-title>
                <v-list-item-subtitle>{{ username }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
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
              <v-btn
                class="mx-2"
                color="error"
                @click="tryActionOnAccount"
                v-show="mode === SingleAccountDialogModes.DELETE"
                :loading="loading"
                >delete</v-btn
              >
              <v-btn
                class="mx-2"
                color="info"
                @click="tryActionOnAccount"
                v-show="mode === SingleAccountDialogModes.UNLOCK"
                :loading="loading"
                >unlock</v-btn
              >
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
import { SingleAccountDialogModes } from '../constants'
export default {
  name: 'Dialog',
  mixins: [validationMixin],
  validations: {
    key: {
      minLength: minLength(8),
      required
    }
  },
  data() {
    return {
      SingleAccountDialogModes
    }
  },
  props: {
    fullscreen: {
      type: Boolean
    }
  },
  methods: {
    ...mapMutations('singleAccountDialog', ['resetState']),
    ...mapActions('singleAccountDialog', ['madeAction']),
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
    ...mapState('singleAccountDialog', ['title', 'accountName', 'username', 'mode', 'loading']),
    keyErrors() {
      const errors = []
      if (!this.$v.key.$dirty) return errors
      !this.$v.key.minLength && errors.push('Key must be at least 8 characters')
      !this.$v.key.required && errors.push('Key is required')
      return errors
    },
    show: {
      get() {
        return this.$store.state.singleAccountDialog.show
      },
      set(value) {
        this.$store.commit('singleAccountDialog/setShow', value)
      }
    },
    showKey: {
      get() {
        return this.$store.state.singleAccountDialog.showKey
      },
      set(value) {
        this.$store.commit('singleAccountDialog/setShowKey', value)
      }
    },
    key: {
      get() {
        return this.$store.state.singleAccountDialog.key
      },
      set(value) {
        this.$store.commit('singleAccountDialog/setKey', value)
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
