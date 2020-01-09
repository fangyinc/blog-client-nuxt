<template>
  <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      hide-selected
      :label="label"
      multiple
      small-chips
      solo
  >
    <template slot="no-data">
      <v-list-tile>
        <span class="subheading">Create</span>
        <v-chip
            :color="`${color} lighten-3`"
            label
            small
        >
          {{ search }}
        </v-chip>
      </v-list-tile>
    </template>
    <template
        slot="selection"
        slot-scope="{ item, parent, selected }"
        v-if="item === Object(item)"
    >
      <v-chip
          :color="`${color} lighten-3`"
          :selected="selected"
          label
          small
      >
        <span class="pr-2">
          {{ item.text }}
        </span>
        <v-icon
            small
            @click="parent.selectItem(item)"
        >close</v-icon>
      </v-chip>
    </template>
    <template
        slot="item"
        slot-scope="{ index, item, parent }"
    >
      <v-list-tile-content>
        <v-text-field
            v-if="editing === item"
            v-model="editing.text"
            autofocus
            flat
            background-color="transparent"
            hide-details
            solo
            @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip
            :color="`${color} lighten-3`"
            dark
            label
            small
            v-else
        >
          {{ item.text}}
        </v-chip>
      </v-list-tile-content>
      <v-spacer></v-spacer>
      <v-list-tile-action @click.stop>
        <v-btn
            icon
            @click.stop.prevent="edit(index, item)"
        >
          <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
        </v-btn>
      </v-list-tile-action>
    </template>
  </v-combobox></template>

<script>
  export default {
    name: 'infoCreate',
    props: {
      color: {
        type: String,
        default: 'green'
      },
      items: {
        type: Array,
        default: () => { return [] }
      },
      size: {
        type: Number,
        default: 1
      },
      label: {
        type: String,
        default: ''
      },
      model: {
        type: Array,
        default: () => { return [] }
      }
    },
    data: () => ({
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      index: -1,
      nonce: 1,
      menu: false,
      // model: [
      // ],
      selectModel: [
      ],
      x: 0,
      search: null,
      y: 0
    }),

    watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1]
            }
            this.items.push(v)
            this.selectModel.push(v)
            this.nonce++
            this.handChange()
          }
          return v
        })
      }
    },

    methods: {
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const name = hasValue(itemText)
        const query = hasValue(queryText)

        return name.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      handChange () {
        let info = this.selectModel.map(v => {
          return {name: v.text}
        })
        this.$log.debug('info', info)
        this.$emit('change', info)
      }
    }

  }
</script>

<style scoped>
</style>