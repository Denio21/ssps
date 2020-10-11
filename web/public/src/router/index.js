import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Timer from '../views/timer/Timer.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import LectureHome from '../views/lecture/LectureHome.vue'
import LecturePage from '../views/lecture/LecturePage.vue'
import LecturePresentations from '../views/lecture/LecturePresentations.vue'
import LecturePresentation from '../views/lecture/LecturePresentation.vue'
import LectureTests from '../views/lecture/LectureTests.vue'
import LectureTest from '../views/lecture/LectureTest.vue'
import LectureHomeworks from '../views/lecture/LectureHomeworks.vue'
import LectureHomework from '../views/lecture/LectureHomework.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/timer',
    name: 'timer',
    component: Timer,
  },
  {
    path: '/podminky-pouzivani',
    name: 'privacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/predmet/:shortcut',
    name: 'lecture',
    component: LectureHome
  },
  {
    path: '/predmet/:shortcut/prezentace',
    name: 'lecture-presentations',
    component: LecturePresentations
  },
  {
    path: '/predmet/:shortcut/prezentace/:presentation',
    name: 'lecture-presentation',
    component: LecturePresentation
  },
  {
    path: '/predmet/:shortcut/testy',
    name: 'lecture-tests',
    component: LectureTests
  },
  {
    path: '/predmet/:shortcut/test/:test',
    name: 'lecture-test',
    component: LectureTest
  },
  {
    path: '/predmet/:shortcut/ukoly',
    name: 'lecture-homeworks',
    component: LectureHomeworks
  },
  {
    path: '/predmet/:shortcut/ukol/:homework',
    name: 'lecture-homework',
    component: LectureHomework
  },
  {
    path: '/predmet/:shortcut/:page',
    name: 'lecture-page',
    component: LecturePage
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})

export default router
