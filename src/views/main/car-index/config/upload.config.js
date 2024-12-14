export const rules = {
  CarId: [{ required: true, message: '请输入Vin号', trigger: 'blur' }],
  carowner: [{ required: true, message: '请输入车主', trigger: 'blur' }],
  m_amount: [{ required: true, message: '请输入材料金额', trigger: 'blur' }],
  r_amount: [{ required: true, message: '请输入维修金额', trigger: 'blur' }],
  Describe: [{ required: true, message: '请输入事故描述', trigger: 'blur' }],
  detail: [{ required: true, message: '请输入维修详情', trigger: 'blur' }]
}
