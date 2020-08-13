<template>
  <article class="shit">
    <div class="shit-content">
      
      <div class="shit-left">
        <router-link :to="{name: 'user-details', params: { username: shit.user.username }}">
          <img class="icon-wrapper icon-small" 
              :src="shit.user.profile.profile_picture" 
              :alt="`@${shit.user.username}`"
          />
        </router-link>
      </div>

      <div class="shit-center">
        <div class="shit-header">

          <h4>
            <router-link :to="{ name: 'user-details', params: { username: shit.user.username }}">
              {{ shit.user.username }}
            </router-link>
          </h4>

          <router-link :to="{name: 'shit-detail', params: {uuid: shit.uuid}}">
            {{ shit.publish_date | formatdate }}
          </router-link>
        </div>

        <p class="has-pointer preserve-line-breaks" @click="showShitDetail">
          {{ shit.text }}
        </p>
      </div>
    </div>
    <div class="shit-feedback">

      <div class="shit-feedback-item">
        <button class="reshit" @click="$emit('reshit', shit)">
          <i class="fas fa-retweet" />
          
        </button>
        <span>
            {{ shit.reshits }}
          </span>
      </div>

      <div class="shit-feedback-item">
        <button class="favourite" 
               :class="{'is-favourite': shit.is_favourite}" 
               @click="$emit('favourite', shit)"
        >
         <i class="fas fa-poop" />
        </button>
         <span> {{ shit.favourites }} </span>
      </div>

    </div>
  </article>
</template>
<script>
export default {
  props: {
    shit: {
      type: Object,
      required: true
    }
  },
  methods: {
    showShitDetail() {
      this.$router.push({
        name: 'shit-detail',
        params: {
          uuid: this.shit.uuid
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/colors.scss';

.shit {
  background-color: white;
  max-width: 720px;
  padding: 1em;
  border-radius: 8px;
  margin-bottom: 1em;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  box-shadow: rgba($color: #000000, $alpha: 0.4) 0 0 8px;

  &:hover {
    box-shadow: rgba($color: #000000, $alpha: 0.7) 0 0 12px;
    transition: 0.25s ease-in;

  }

  p {
    margin: .25em 0 .25em 0;
  }

  &-content {
    display: flex;
  }

  &-center {
    margin: 0 1em 0 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  h4 {
    margin: 0 .25em 0 0;
  }

  &-header {
    display: flex;
  }

  &-feedback {
    width: 100%;
    display: flex;
    justify-content: center;

    &-item {
      display: flex;
      justify-content: center;
      margin: 0 2em 0 2em;
      align-items: center;

      span {
        margin-left: 1em;
      }
    }
    
    .favourite:hover, .is-favourite {
      color: $poop;
    }


    .reshit:hover, .is-reshit {
      color: $success;
    }

    .link:hover {
      color: #333;
    }

    button {
      display: flex;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 100%;
      align-items: center;
      cursor: pointer;
      border: none;

      &:hover {
        background-color: darken(white, 10%);
      }
    }
  }
}

</style>