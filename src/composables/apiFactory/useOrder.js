export const useOrder = () => {
  const getOpenOrders = () => {
    return useHttpRequest('order.open')
  }

  const getClosedOrders = () => {
    return useHttpRequest('order.closed')
  }

  const getTrades = () => {
    return useHttpRequest('order.trades')
  }

  const getOrderTrades = () => {
    return useHttpRequest('order.wallet')
  }

  const getOrderInfo = () => {
    return useHttpRequest('order.info')
  }

  const cancelOrder = () => {
    return useHttpRequest('order.cancel')
  }

  return {
    getOpenOrders,
    getClosedOrders,
    getTrades,
    getOrderTrades,
    getOrderInfo,
    cancelOrder,
  }
}
