<template>
  <v-list three-line class="asd">
    <div v-for="(item, index) in items" :key="index" :class="{ selected: selected === item }">
      <v-list-item @click="$emit('selectItem', item)">
        <v-list-item-content>
          <v-list-item-title>Account: {{ item.accountName }}</v-list-item-title>
          <v-list-item-title>Username: {{ item.username }}</v-list-item-title>
          <v-list-item-title v-if="!(selected === item && !item.password)"
            >Passwrod: {{ !!item.password || 'Unavailable' }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="selected === item && !item.password">
        <v-list-item-title>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            required
            :type="showPassword ? 'text' : 'password'"
            label="Enter your key"
            @click:append="showPassword = !showPassword"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-list-item-action>
            <v-btn color="primary" @click="ok">Ok</v-btn>
          </v-list-item-action>
        </v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>
    </div>
  </v-list>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'HelloToolbar',
  mixins: [validationMixin],
  validations: {
    password: {
      minLength: minLength(8),
      required
    }
  },
  data: () => ({
    password: '',
    showPassword: false
  }),
  props: {
    items: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Object,
      default: undefined
    }
  },
  methods: {
    ok() {
      console.log('AAA')
    }
  },
  computed: {
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
.selected {
  background-color: lightyellow;
}
</style>
