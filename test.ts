custom.setAddr(custom.MyAddr.ADDR)
basic.forever(function () {
    serial.writeValue("PM1", custom.gainParticleConcentration_ugm3(custom.MyType.ATMOSPHERE, custom.MyEnum.PM1_0))
    serial.writeValue("PM2.5", custom.gainParticleConcentration_ugm3(custom.MyType.ATMOSPHERE, custom.MyEnum.PM2_5))
    serial.writeValue("PM10", custom.gainParticleConcentration_ugm3(custom.MyType.ATMOSPHERE, custom.MyEnum.PM10))
    basic.pause(2000)
})
