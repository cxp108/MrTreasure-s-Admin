export default {
  items: [
    {
      name: '仪表盘',
      url: '/admin/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: '项目分栏'
    },
    {
      name: '个人简历',
      url: '/',
      icon: 'fa fa-id-card-o',
      children: [
        {
          name: '个人信息',
          url: '/admin/userinfo',
          icon: 'fa fa-hdd-o'
        },
        {
          name: '工作经历',
          url: '/admin/career',
          icon: 'fa fa-hdd-o'
        },
        {
          name: '项目经历',
          url: '/admin/project',
          icon: 'fa fa-hdd-o'
        }
      ]
    },
    {
      divider: true
    },
    {
      name: '个人博客',
      icon: 'fa fa-id-card-o',
      children: [
        {
          name: '博客首页',
          url: '##',
          icon: 'fa fa-superpowers'
        },
        {
          name: '编辑文章',
          url: '##',
          icon: 'fa fa-superpowers'
        }
      ]
    }
  ]
}
