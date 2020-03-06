<template>
  <div :class="{ selected: selected === item }">
    <v-list-item @click="$emit('selectItem', item)">
      <v-list-item-content>
        <v-list-item-title>Account: {{ item.accountName }}</v-list-item-title>
        <v-list-item-title>Username: {{ item.username }}</v-list-item-title>
        <v-list-item-title v-if="!(selected === item && !item.password)" :class="item.password ? 'password' : ''"
          >Passwrod: {{ !!item.password ? item.password : 'Unavailable' }}</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
    <v-list-item class="d-flex flex-column" v-if="selected === item && !item.password">
      <v-list-item-title class="align-self-stretch">
        <v-text-field
          v-model="key"
          :error-messages="keyErrors"
          :append-icon="showKey ? 'mdi-eye' : 'mdi-eye-off'"
          required
          :type="showKey ? 'text' : 'password'"
          label="Enter your key"
          @click:append="showKey = !showKey"
          @input="$v.key.$touch()"
          @blur="$v.key.$touch()"
        ></v-text-field>
      </v-list-item-title>
      <v-list-item-action class="d-flex flex-row">
        <v-btn class="" color="primary" @click="tryToGetPassword" :loading="getingPassword">get password</v-btn>
        <v-btn class="mx-2" color="error" @click="tryToDeleteItem" :loading="deleting">delete</v-btn>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'HomeToolbarItem',
  mixins: [validationMixin],
  validations: {
    key: {
      minLength: minLength(8),
      required
    }
  },
  data() {
    return {
      key: '',
      showKey: false
    }
  },
  props: {
    item: {
      type: Object,
      default: () => null
    },
    selected: {
      type: Object,
      default: undefined
    },
    deleting: {
      type: Boolean,
      default: false
    },
    getingPassword: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    valid() {
      this.$v.$touch()
      return !this.$v.$error
    },
    tryToDeleteItem() {
      if (this.valid()) {
        const { selected, key } = this
        this.$emit('deleteItem', { account: selected, key: key })
      }
    },
    tryToGetPassword() {
      if (this.valid()) {
        const { selected, key } = this
        this.$emit('getPassword', { account: selected, key: key })
      }
    }
  },
  computed: {
    keyErrors() {
      const errors = []
      if (!this.$v.key.$dirty) return errors
      !this.$v.key.minLength && errors.push('Key must be at least 8 characters')
      !this.$v.key.required && errors.push('Key is required')
      return errors
    }
  }
}
</script>
<style lang="scss" scoped>
.selected {
  background-color: lightyellow;
}
.password {
  color: green;
}
</style>
