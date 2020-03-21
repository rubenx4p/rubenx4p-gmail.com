<template>
  <div class="item-wrapper d-flex">
    <!-- <v-list-item-action>
      <v-checkbox></v-checkbox>
    </v-list-item-action> -->
    <v-list-item class="account-info">
      <v-list-item-content>
        <v-list-item-title>Account: {{ item.accountName }}</v-list-item-title>
        <v-list-item-title>Username: {{ item.username }}</v-list-item-title>
        <v-list-item-title
          >Password:
          <span class="unlocked" @click="copy">{{ item.password }}</span>
          <span class="locked" v-show="!item.password">Locked</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="align-self-center">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-show="!item.password" @click="$emit('unlockAccountDialog', item)">
          <v-list-item-title>Unlock</v-list-item-title>
        </v-list-item>
        <v-list-item v-show="item.password" @click="$emit('lock', item)">
          <v-list-item-title>Lock</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('edit', item)">
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('deleteAccountDialog', item)">
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item>
        <v-list-item @click="copy" v-show="item.password">
          <v-list-item-title>Copy</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
    }
  },
  methods: {
    valid() {
      this.$v.$touch()
      return !this.$v.$error
    },
    edit() {},
    copy() {
      this.$emit('copy', this.item.password)
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
.item-wrapper {
  padding-inline-start: 12px;
}
.v-list-item__action {
  margin-right: 0px !important;
}
.v-list-item__title {
  white-space: initial;
}
.account-info {
  overflow: hidden;

  .unlocked {
    color: green;
    cursor: pointer;
    font-weight: bolder;
    text-decoration: underline;
  }
  .locked {
    color: red;
  }
}
</style>
