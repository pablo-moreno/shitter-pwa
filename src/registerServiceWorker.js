/* eslint-disable no-console */

import { register } from "register-service-worker"
import EventBus from './EventBus'


if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      EventBus.$emit('ready')

      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      EventBus.$emit('registered')
      console.log("Service worker has been registered.");
    },
    cached() {
      EventBus.$emit('cached')
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      EventBus.$emit('updatefound')
      console.log("New content is downloading.");
    },
    updated() {
      EventBus.$emit('updated')
      console.log("New content is available; please refresh.");
    },
    offline() {
      EventBus.$emit('offline')
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      EventBus.$emit('sw-error')
      console.error("Error during service worker registration:", error);
    }
  });
}
