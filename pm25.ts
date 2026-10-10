/** PM2.5 SEN0460 I2C sensor */
//% color=#37A86B icon="\uf0c2" block="PM2.5" weight=80
namespace custom {
    export enum MyAddr {
        //% block="0x19"
        ADDR = 0x19
    }
    export enum MyType {
        //% block="atmospheric"
        ATMOSPHERE = 0,
        //% block="standard"
        STANDARD = 1
    }
    export enum MyEnum {
        //% block="PM1.0"
        PM1_0 = 0,
        //% block="PM2.5"
        PM2_5 = 1,
        //% block="PM10"
        PM10 = 2
    }
    let sensorAddress = 0x19
    //% blockId=pm25_setAddr block="set address %address"
    //% weight=100
    export function setAddr(address: MyAddr): void {
        sensorAddress = address
    }
    function readRegister(reg: number): number {
        pins.i2cWriteNumber(sensorAddress, reg, NumberFormat.UInt8BE, true)
        let b = pins.i2cReadBuffer(sensorAddress, 2, false)
        if (b.length < 2) return -1
        return b[0] * 256 + b[1]
    }
    //% blockId=pm25_gainParticleConcentration block="particle concentration %type %particle (ug/m3)"
    //% weight=90
    export function gainParticleConcentration_ugm3(type: MyType, particle: MyEnum): number {
        let register = (type == MyType.STANDARD ? 0x05 : 0x0B) + particle * 2
        return readRegister(register)
    }
}
