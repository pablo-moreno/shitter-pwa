import { shallowMount } from "@vue/test-utils"
import Shit from "@/components/Shit.vue"

describe("Shit.vue", () => {
  it("renders props.msg when passed", () => {
    const shit = {
      "uuid":"5198907e-9541-4ee3-b97a-027a573f5da2", 
      "text":"You burgeouise pig  -> You go to Gulag",
      "user":{
        "id":8,
        "username":"lideresasuprema",
        "first_name":"Kim Yo-jong",
        "profile":{
          "profile_picture":"http://localhost:8000/media/profile-pictures/heavykoala580.jpg", 
          "private":false
        },
        "total_shits":13,
        "followers_count":9,
        "following_count":6,
        "following":{
          "im_following":true,
          "follows_me":true
        }
      },
      "publish_date":"2020-08-08T14:42:43.697216+02:00",
      "reshits":0,
      "favourites":1,
      "is_reshit":false,
      "detail_url":"/api/shitter/shits/5198907e-9541-4ee3-b97a-027a573f5da2",
      "is_mine":false,
      "is_favourite":true,
      "reshit":null
    }
    
    const wrapper = shallowMount(Shit, {
      propsData: { shit }
    })

    expect(wrapper.text()).toContain(shit.text)
  })
})
