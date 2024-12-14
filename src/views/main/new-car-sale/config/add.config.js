export const rules = {
  CarId: [{ required: true, message: '请输入车架号', trigger: 'blur' }],
  CarBrand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
  CarName: [{ required: true, message: '请输入车名称', trigger: 'blur' }],
  CarClass: [{ required: true, message: '请输入车型级别', trigger: 'blur' }],
  Domestic: [{ required: true, message: '请选择是否是国产', trigger: 'change' }],
  Engin: [{ required: true, message: '请输入发动机型号', trigger: 'blur' }],
  exDate: [{ required: true, message: '请输入出厂日期', trigger: 'change' }],
  GuidePrice: [{ required: true, message: '请输入厂商指导价', trigger: 'blur' }],
  manufacture: [{ required: true, message: '请输入制造商', trigger: 'blur' }]
}
