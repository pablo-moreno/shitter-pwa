<template>
  <nav class="navbar">
    <div class="navbar-start">
      <div class="navbar-logo">
        <router-link :to="{'name': 'home'}">
          <img src="@/assets/poop.svg" alt="Shitter">
        </router-link>
      </div>
      <h2>
        <router-link :to="{'name': 'home'}">
          Shitter
        </router-link>
      </h2>
    </div>
    <div class="navbar-end">
      <button class="navbar-logout" @click="$emit('logout')">
        Logout
      </button>
    </div>  
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  height: 64px;
  width: 100%;
  background-color: rgb(82, 33, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .navbar-start {
    display: flex;
    justify-content: center;
  }

  .navbar-logo {
    display: flex;
    justify-content: center;
    margin-left: 1em;
  }

  .navbar-logo > a > img {
    width: 48px;
  }

  .navbar-logout {
    border: none;
    background-color: transparent;
    font-size: 20px;
    color: #b38f1b;
    cursor: pointer;

    &:hover {
      color: darken(#b38f1b, 10%);
    }
  }

  h2 {
    margin: 0 0 0 1em;
    padding: 0;
    display: flex;
    align-items: center;

  }

  a {
    color: #b38f1b;
    text-decoration: none;

    &:hover {
      color: darken(#b38f1b, 10%);
    }
  }
}

</style>