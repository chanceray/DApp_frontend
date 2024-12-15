<!-- RoleSelector.vue -->
<template>
  <div class="role-selector">
    <div 
      v-for="role in roles" 
      :key="role.value"
      class="role-button"
      :class="{ 'selected': modelValue === role.value }"
      @click="handleSelect(role.value)"
    >
      <div class="icon-wrapper">
        <i class="role-icon" :class="getRoleIcon(role.value)"></i>
      </div>
      <span>{{ role.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoleSelector',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    roles: {
      type: Array,
      default: () => ([
        { name: '消费者', value: '1' },
        { name: '生产厂家', value: '2' },
        { name: '销售商', value: '3' },
        { name: '监管者', value: '4' }
      ])
    },
    customIcons: {
      type: Object,
      default: () => ({
        '1': 'fas fa-user',
        '2': 'fas fa-industry',
        '3': 'fas fa-store',
        '4': 'fas fa-shield-alt'
      })
    }
  },
  emits: ['update:modelValue', 'change'],
  methods: {
    getRoleIcon(value) {
      return this.customIcons[value] || this.defaultIcons[value]
    },
    handleSelect(value) {
      this.$emit('update:modelValue', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>
.role-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem;
}

.role-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 8rem;
  padding: 1.5rem 1rem;
  border-radius: 1rem;
  border: 2px solid transparent;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.role-button:hover {
  transform: scale(1.05);
  border-color: rgba(255, 165, 0, 0.4);
  background: rgba(255, 165, 0, 0.05);
}

.role-button.selected {
  background: linear-gradient(to bottom right, rgba(255, 165, 0, 0.1), rgba(255, 165, 0, 0.2));
  border-color: rgba(255, 165, 0, 0.8);
  box-shadow: 0 4px 12px rgba(255, 165, 0, 0.15);
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #f5f5f5;
  transition: all 0.3s ease;
}

.selected .icon-wrapper {
  background: rgba(255, 165, 0, 0.8);
}

.role-icon {
  font-size: 1.5rem;
  color: #666;
  transition: all 0.3s ease;
}

.selected .role-icon {
  color: white;
}

span {
  font-weight: 500;
  text-align: center;
  color: #666;
  transition: all 0.3s ease;
}

.selected span {
  color: rgba(255, 165, 0, 0.9);
}
</style>