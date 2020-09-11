import HarvestedCrop from './harvested-crop'

export default class Crop {
  constructor(type, timeStamp, x, y) {
    this.type = type
    this.x = x
    this.y = y
    this.timeStamp = timeStamp
    this.isWatered = false
    this.isReadyToHarvest = false
    this.growthCycle = null
    this.age = 0
    this.currentStage = 0;
    this.stages = null
    this.domElement = document.createElement('div')
    this.domElement.className = `crop-container`
    this.domElement.style.left = this.x * 16 + 'px'
    this.domElement.style.top = this.y * 32 + 'px'
    const cropElement = document.createElement('div')
    cropElement.className = `crop ${type}`
    this.domElement.appendChild(cropElement)
    const veggieTable = { // lol
      onion: {
        growthCycle: 1,
        stages: [
          ['-80px', '0px'],
          ['-62px', '0px'],
          ['-46px', '0px'],
          ['-32px', '0px'],
          ['-16px', '0px'],
        ],
        worth: 5
      },
      'string-bean': {
        growthCycle: 1,
        stages: [
          ['-80px', '-16px'],
          ['-62px', '-16px'],
          ['-46px', '-16px'],
          ['-32px', '-16px'],
          ['-16px', '-16px'],
        ],
        worth: 10,
      },
      tomato: {
        growthCycle: 45,
        stages: [
          ['-80px', '-32px'],
          ['-62px', '-32px'],
          ['-46px', '-32px'],
          ['-32px', '-32px'],
          ['-16px', '-32px'],
        ],
        worth: 15
      },
      plum: {
        growthCycle: 60,
        stages: [
          ['-80px', '-48px'],
          ['-62px', '-48px'],
          ['-46px', '-48px'],
          ['-32px', '-48px'],
          ['-16px', '-48px'],
        ],
        worth: 20,
      },
      pineapple: {
        growthCycle: 75,
        stages: [
          ['-80px', '-64px'],
          ['-62px', '-64px'],
          ['-46px', '-64px'],
          ['-32px', '-64px'],
          ['-16px', '-64px'],
        ],
        worth: 25,
      },
      strawberry: {
        growthCycle: 90,
        stages: [
          ['-80px', '-96px'],
          ['-62px', '-96px'],
          ['-46px', '-96px'],
          ['-32px', '-96px'],
          ['-16px', '-96px'],
        ],
        worth: 30,
      },
      potato: {
        growthCycle: 105,
        stages: [
          ['-80px', '-112px'],
          ['-62px', '-112px'],
          ['-46px', '-112px'],
          ['-32px', '-112px'],
          ['-16px', '-112px'],
        ],
        worth: 35,
      },
      pumpkin: {
        growthCycle: 120,
        stages: [
          ['-80px', '-128px'],
          ['-62px', '-128px'],
          ['-46px', '-128px'],
          ['-32px', '-128px'],
          ['-16px', '-128px'],
        ],
        worth: 40,
      },
      corn: {
        growthCycle: 135,
        stages: [
          ['-80px', '-144px'],
          ['-62px', '-144px'],
          ['-46px', '-144px'],
          ['-32px', '-144px'],
          ['-16px', '-144px'],
        ],
        worth: 45,
      },
    }
    this.stages = veggieTable[type].stages
    this.growthCycle = veggieTable[type].growthCycle
    this.worth = veggieTable[type].worth
    const backgroundCoords = this.stages[this.currentStage]
    cropElement.style.backgroundPosition = backgroundCoords.join(' ')
  }
  grow() {
    if(!this.isWatered || this.isReadyToHarvest) return;
    this.age++
    if(this.age > this.growthCycle) {
      this.growToNextStage()
    }
  }
  growToNextStage() {
    this.currentStage++
    if(this.currentStage === this.stages.length) {
      this.isReadyToHarvest = true
    } else {
      const backgroundCoords = this.stages[this.currentStage]
      this.domElement.firstElementChild.style.backgroundPosition = backgroundCoords.join(' ')
    }
    this.isWatered = false
    this.domElement.firstElementChild.classList.remove('watered')
    this.age = 0
  }
  water() {
    this.isWatered = true
    this.domElement.firstElementChild.classList.add('watered')
  }
  kill() {
    this.domElement.remove()
  }
  harvest() {
    return new HarvestedCrop(
      this.type,
      ['0px', this.stages[0][1]],
      this.worth
    )
  }
}
