import gql from 'graphql-tag'
import apollo from '../apolloClient'

export default {
  async getOrders ({ commit }) {
    try {
      commit('SET_LOADING', true)

      const response = await apollo.query({
        query: gql`
          query Orders {
            orders {
              id
              name
              sku
              transaction_id
              price
              transaction_status
              date_paid
              profit
              buyer_name
              buyer_username
              shipping_date
            }
          }
        `
      })

      const { orders } = response.data

      commit('SET_ORDERS', orders)
    } catch (err) {
      console.log(err)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async getOrder ({ commit }, id) {
    try {
      commit('SET_LOADING', true)

      const variables = {
        id: id 
      }

      const response = await apollo.query({
        query: gql`
          query Order($id: ID!) {
            order(id: $id) {
              id
              name
              sku
              transaction_id
              price
              transaction_status
              date_paid
              profit
              buyer_name
              buyer_username
              shipping_date
            }
          }
        `,
        variables
      })

      const { order } = response.data

      commit('SET_ORDER', order)
    } catch (err) {
      console.log(err)
    } finally {
      commit('SET_LOADING', false)
    }
  }
}