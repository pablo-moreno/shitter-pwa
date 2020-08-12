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
          <span>
            Shitter
          </span>
        </router-link>
      </h2>
    </div>
    <div class="navbar-end">
      <button class="navbar-logout" @click="$emit('logout')">
        <i class="fas fa-sign-out-alt"></i>
        <span>
          Logout
        </span>
      </button>
    </div>  
  </nav>
</template>

<style lang="scss" scoped>
@import '@/styles/colors.scss';

.navbar {
  position: fixed;
  height: 64px;
  width: 100%;
  background-color: $navbar;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 10px;

  .navbar-start {
    display: flex;
    justify-content: center;
  }

  .navbar-logo {
    display: flex;
    justify-content: center;
    margin-left: 1em;

    
  }

  @media screen and (max-width: 640px) {
    span {
      display: none;
    }
  }

  .navbar-logo > a > img {
    width: 48px;
  }

  .navbar-logout {
    border: none;
    background-color: transparent;
    margin-right: 1em;
    font-size: 20px;
    color: $link;
    cursor: pointer;

    &:hover {
      color: $darklink;
    }

    @media screen and (max-width: 640px) {
      span {
        display: none;
      }
    }
  }

  h2 {
    margin: 0 0 0 1em;
    padding: 0;
    display: flex;
    align-items: center;

  }

  a {
    color: $link;
    text-decoration: none;

    &:hover {
      color: $darklink;
    }
  }
}

</style>