// Example / test file (not included in the production extension code).
// Keeps the original block-friendly names and API.
custom.setAddr(MyAddr.ADDR)
basic.forever(function () {
    serial.writeValue("PM1.0", custom.gainParticleConcentration_ugm3(MyType.ATMOSPHERE, MyEnum.PM1_0))
    serial.writeValue("PM2.5", custom.gainParticleConcentration_ugm3(MyType.ATMOSPHERE, MyEnum.PM2_5))
    serial.writeValue("PM10", custom.gainParticleConcentration_ugm3(MyType.ATMOSPHERE, MyEnum.PM10))
    basic.pause(2000)
})
