export const rules = {
  usertype: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
  account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
