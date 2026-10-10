# PM2.5 — SEN0460 MakeCode extension

Legacy-compatible MakeCode extension for the DFRobot Gravity SEN0460 (PM1.0, PM2.5 and PM10) on micro:bit / Octopus:bit. The category is called **PM2.5** and uses a cloud icon.

## Background

This reimplementation preserves the numeric enum definitions, JavaScript names and original I2C register-read sequence found in the older [tangjie133/pxt-DFRobot_PM25_Air_Quality_Sensor](https://github.com/tangjie133/pxt-DFRobot_PM25_Air_Quality_Sensor/blob/master/custom.ts) extension (v0.0.5). In particular, the enums are **global** (`MyAddr`, `MyType`, `MyEnum`) and the functions are in `custom`.

## Import into MakeCode

Upload `pxt.json`, `pm25.ts`, `README.md` and `test.ts` to the root of your repository `https://github.com/imdrift/pxt-pm25`. Remove the *old PM extension* from the MakeCode project before adding this one, since both implement the same `custom` namespace and enums. Search for the GitHub repository URL under **Extensions**. Existing open projects can require an extension refresh or new project import before they pick up an updated GitHub revision.

## Block-friendly JavaScript example

```typescript
custom.setAddr(MyAddr.ADDR)
basic.forever(function () {
    let pm1 = custom.gainParticleConcentration_ugm3(MyType.ATMOSPHERE, MyEnum.PM1_0)
    let pm25 = custom.gainParticleConcentration_ugm3(MyType.ATMOSPHERE, MyEnum.PM2_5)
    let pm10 = custom.gainParticleConcentration_ugm3(MyType.ATMOSPHERE, MyEnum.PM10)
    serial.writeValue("PM1.0", pm1)
    serial.writeValue("PM2.5", pm25)
    serial.writeValue("PM10", pm10)
    basic.pause(2000)
})
```

`test.ts` is an optional example test, not included in `files` so it does not run inside the extension itself.

## Hardware note

A sensor responding to I2C does not guarantee that its fan runs. Use only valid logic levels for micro:bit SDA and SCL. Do not feed 5 V into micro:bit I2C pins. Poor airflow means PM readings are unreliable. Very high readings need independent verification even when the fan runs.

## Test status

Source adapted from publicly available working legacy code; not compiled in the MakeCode cloud or verified against physical hardware in this package. Test the JavaScript ↔ Blocks conversion and live sensor readings before using in a class.
