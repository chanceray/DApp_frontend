export default function (status) {
  switch (status) {
    case 1:
      return { text: 'Completed', color: '#82d9a5' }
    case 2:
      return { text: 'Pedding', color: '#969b9f' }
    case 3:
      return { text: 'Canceled', color: '#fe4848' }
  }
}
