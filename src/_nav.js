export default {
  items: [
    {
      name: '仪表盘',
      url: '/dashboard',
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
          url: '/',
          icon: 'fa fa-hdd-o'
        },
        {
          name: '工作经历',
          url: '/',
          icon: 'fa fa-hdd-o'
        },
        {
          name: '项目经历',
          url: '/',
          icon: 'fa fa-hdd-o'
        }
      ]
    },
    {
      name: '个人博客',
      url: '/',
      icon: 'fa fa-id-card-o',
      children: [
        {
          name: '博客首页',
          url: '/'
        },
        {
          name: '编辑文章',
          url: '/'
        }
      ]
    }
  ]
}
