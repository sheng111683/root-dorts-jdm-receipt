const isXsOnly = ref(false) //            ? < 768
const isSmOnly = ref(false) //     768 <= ? < 992
const isSmAndDown = ref(false) //         ? < 992
const isSmAndUp = ref(false) //    768 <= ?
const isMdOnly = ref(false) //     992 <= ? < 1200
const isMdAndDown = ref(false) //         ? < 1200
const isMdAndUp = ref(false) //    992 <= ?
const isLgOnly = ref(false) //    1200 <= ? < 1920
const isLgAndDown = ref(false) //         ? < 1920
const isLgAndUp = ref(false) //   1200 <= ?
const isXlOnly = ref(false) //    1920 <= ?
const screenWidth = ref(0)
const screenHeight = ref(0)
const idleCountDownSeconds = ref(0)
const countDownInterval = ref<NodeJS.Timeout | undefined>()

function setScreenWidth(value) {
  screenWidth.value = value
  isXsOnly.value = value < 768
  isSmOnly.value = value >= 768 && value < 992
  isSmAndDown.value = value < 992
  isSmAndUp.value = value >= 768
  isMdOnly.value = value >= 992 && value < 1200
  isMdAndDown.value = value < 1200
  isMdAndUp.value = value >= 992
  isLgOnly.value = value >= 1200 && value < 1920
  isLgAndDown.value = value < 1920
  isLgAndUp.value = value >= 1200
  isXlOnly.value = value >= 1920
}

function setScreenHeight(value) {
  screenHeight.value = value
}

function setIdleCountDownSeconds(value) {
  idleCountDownSeconds.value = value
}

function idleCountDown(onTimesUp) {
  clearInterval(countDownInterval.value)
  if (idleCountDownSeconds.value > 0) {
    countDownInterval.value = setInterval(() => {
      if (idleCountDownSeconds.value <= 0) {
        clearInterval(countDownInterval.value)
        onTimesUp()
      }
      else {
        --idleCountDownSeconds.value
      }
    }, 1000)
  }
}

export function useGlobal() {
  return {
    isXsOnly,
    isSmOnly,
    isSmAndDown,
    isSmAndUp,
    isMdOnly,
    isMdAndDown,
    isMdAndUp,
    isLgOnly,
    isLgAndDown,
    isLgAndUp,
    isXlOnly,
    screenWidth,
    screenHeight,
    idleCountDownSeconds,
    setScreenWidth,
    setScreenHeight,
    setIdleCountDownSeconds,
    idleCountDown,
  }
}
