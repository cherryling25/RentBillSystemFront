<template>
  <div class="home">
    <el-container style="height: 100%;width: 100%; position: fixed; border: 1px solid #eee">
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-radio-group v-model="isCollapse" style="margin-bottom: 10px;">
          <el-radio-button :label="false" style="width:65px;">展开</el-radio-button>
          <el-radio-button :label="true" style="width:65px;">收起</el-radio-button>
        </el-radio-group>
        <el-submenu :index="menu.id.toString()" v-for="menu in menus" :key="menu.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{menu.menuName}}</span>
          </template>
          <el-menu-item-group>
            <template v-for="submenu in menu.submenus">
              <router-link :to="'/home/'+submenu.path" class="routerStyle" :key="submenu.id">
                <el-menu-item>{{submenu.title}}</el-menu-item>
              </router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <h2>租房系统</h2>
          <el-dropdown trigger="click">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">离开系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="font-size:16px;">{{userAccountName}}</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      isCollapse: true,
      userAccountName:'Ling',
      menus: [{
        id:1,
        menuName: '房间',
        submenus: [
          {
            id : 1,
            title: 'room',
            path: 'room'
          },
          {
            id : 2,
            title: '房屋',
            path: 'building'
          },
        ]
      },
      {
        id:2,
        menuName: 'demo2',
        submenus: [
          {
            id : 3,
            title: 'demo222',
            path: 'room'
          },
          {
            id : 4,
            title: 'demo222',
            path: 'building',
          },
        ]
      }
      ]
    };
  },
  methods: {
    logout: function () {
      this.$confirm('确认退出吗?', '提示', {}).then(() => {
        this.$router.push('/');
      }).catch(() => {

      });
    }
  }
}
</script>
<style scoped>
.el-menu--collapse {
    width: 69px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
.el-header {
    background-color: rgb(182, 219, 235);
    color: #333;
    line-height: 60px;
  }
  h2{
    float: left;
    font-size:23px;
  }
  .routerStyle{
    text-decoration: none;
  }
</style>
