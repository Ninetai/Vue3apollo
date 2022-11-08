<template>
  <div class="flex justify-between mb-10 p-3 items-center">
    <div>
      <div class="text-xl font-bold text-violet-500 ">
        Manage your Orders
      </div>
      <div class="text-sm">
        Manage your orders from the past 90 days - send messages, add tracking numbers, and more.
      </div>
    </div>
    <div class="flex gap-1">
      <el-input
        v-model="searchTxt"
        size="small"
        placeholder="Search ItemID..."
        :prefix-icon="Search"
        class="text-violet-500 border-0"
        style="color: red !important;"
      />
      <el-dropdown :hide-on-click="false">
        <el-button>
          <el-icon>
            <Filter />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu class="w-52">
            <el-dropdown-item
              v-for="column in columns"
              :key="column.name"
              class="justify-between"
              @click="toggleVisibility(column)"
            >
              {{column.name}}
              <el-icon v-if="column.visible">
                <View />
              </el-icon>
              <el-icon v-else>
                <Hide />
              </el-icon>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <el-table
    :data="filteredOrders"
    :default-sort="{ prop: 'date', order: 'descending' }"
    class="w-full border rounded-lg"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column
      label="Item"
      width="200"
      v-if="isColumnVisible('Item')"
    >
      <template #default="scope">
        <template v-if="scope">
          <div v-html="truncate(scope.row.name, 24)"></div>
          <div>Item ID: {{ scope.row.id }}</div>
          <div>SKU: {{ scope.row.sku }}</div>
          <div>Qty: 01</div>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      label="Date"
      width="120"
      v-if="isColumnVisible('Date')"
    >
      <template #default="scope">
        <template v-if="scope">
          <div class="break-normal">{{ scope.row.date_paid }}</div>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      label="Order Details"
      v-if="isColumnVisible('Order Details')"
    >
      <template #default="scope">
        <template v-if="scope">
          <div>Order ID: {{ scope.row.id }}</div>
          <div>Transaction ID: {{ scope.row.transaction_id }}</div>
          <div>Transaction Price: {{ scope.row.price }}</div>
          <div>Transaction Status: {{ scope.row.transaction_status }}</div>
          <div>date_paid: {{ scope.row.date_paid }}</div>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      label="Profit"
      width="160"
      v-if="isColumnVisible('Profit')"
    >
      <template #default="scope">
        <template v-if="scope">
          <div>${{ scope.row.profit }}</div>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      label="Buyer Details"
      width="220"
      v-if="isColumnVisible('Buyer Details')"
    >
      <template #default="scope">
        <template v-if="scope">
          <div>Name: {{ scope.row.buyer_name }}</div>
          <div>Username: {{ scope.row.buyer_username }}</div>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      label="Shipping Date"
      width="180"
      v-if="isColumnVisible('Shipping Date')"
    >
      <template #default="scope">
        <template v-if="scope">
          <div>{{ scope.row.shipping_date }}</div>
        </template>
      </template>
    </el-table-column>
    <el-table-column label="Actions" class="border-1 border-solid">
      <template #default="scope">
        <div class="flex flex-row gap-2">
          <el-button size="small" @click="handleEdit(scope.row)" class="contents">
            Edit
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script>
import { computed, ref, onMounted } from 'vue'
import { Search, Edit, View, Hide, Filter } from '@element-plus/icons-vue'
import { useStore } from 'vuex'

const tableColumns = [
  {
    name: 'Item',
    visible: true,
  },
  {
    name: 'Date',
    visible: true,
  },
  {
    name: 'Order Details',
    visible: true,
  },
  {
    name: 'Profit',
    visible: true,
  },
  {
    name: 'Buyer Details',
    visible: true
  },
  {
    name: 'Shipping Date',
    visible: true
  }
]

export default {
  setup () {
    const store = useStore()
    const searchTxt = ref('')
    const columns = ref(tableColumns)

    onMounted(() => {
      store.dispatch('getOrders')
    })
  
    const truncate = (str, n) => {
      return (str.length > n) ? str.slice(0, n-1) + '&hellip;' : str;
    };

    const toggleVisibility = (column) => {
      column.visible = !column.visible
    }

    return {
      Search,
      Edit,
      
      searchTxt,

      filteredOrders: computed(() => store.state.orders),
      columns,
      
      truncate,
      toggleVisibility
    }
  },
  
  components: {
    View,
    Hide,
    Filter
  },

  methods: {
    handleEdit(order) {
      this.$router.push(`/orders/${order.id}`)
    },

    isColumnVisible(name) {
      const item = this.columns.find((col) => col.name === name)

      if (!item) return false

      return item.visible
    }
  }
}
</script>