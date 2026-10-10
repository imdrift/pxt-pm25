/**
 * PM2.5 – DFRobot SEN0460 (I2C 0x19).
 * Compatible API and register-reading pattern from the original
 * tangjie133/pxt-DFRobot_PM25_Air_Quality_Sensor custom.ts (v0.0.5).
 *
 * Keep enums GLOBAL and preserve numeric values: existing MakeCode
 * JavaScript uses MyAddr, MyType and MyEnum without custom. prefix.
 */

/** Particle size for mass concentration measurement. */
enum MyEnum {
    //% block="PM1.0"
    PM1_0 = 0,
    //% block="PM2.5"
    PM2_5 = 1,
    //% block="PM10"
    PM10 = 2
}

/** Mass-concentration reporting mode. */
enum MyType {
    //% block="standard"
    STANDARD = 0,
    //% block="atmospheric"
    ATMOSPHERE = 1
}

/** Particle diameter used for counts per 0.1 L. */
enum MyEnum1 {
    //% block="0.3um"
    UM03 = 0x11,
    //% block="0.5um"
    UM05 = 0x13,
    //% block="1.0um"
    UM10 = 0x15,
    //% block="2.5um"
    UM25 = 0x17,
    //% block="5.0um"
    UM50 = 0x19,
    //% block="10um"
    UM100 = 0x1B
}

/** I2C address of SEN0460. */
enum MyAddr {
    //% block="0x19"
    ADDR = 0x19
}

//% weight=80 color=#0fbc11 icon="\uf0c2" block="PM2.5"
namespace custom {
    let I2CAddr = 0x19;

    /** Select SEN0460 I2C address (normally 0x19). */
    //% block="set address %eAddr"
    //% weight=98
    export function setAddr(eAddr: MyAddr): void {
        I2CAddr = eAddr;
    }

    /** Read PM mass concentration, in ug/m3. */
    //% block="particle concentration %eType %eOption (ug/m3)"
    //% weight=96
    export function gainParticleConcentration_ugm3(eType: MyType, eOption: MyEnum): number {
        let reg = 0x05;
        if (eType == MyType.STANDARD) {
            if (eOption == MyEnum.PM1_0) reg = 0x05;
            else if (eOption == MyEnum.PM2_5) reg = 0x07;
            else reg = 0x09;
        } else {
            if (eOption == MyEnum.PM1_0) reg = 0x0B;
            else if (eOption == MyEnum.PM2_5) reg = 0x0D;
            else reg = 0x0F;
        }
        let buffer = readReg(reg, 2);
        return (buffer[0] << 8) | buffer[1];
    }

    /** Count particles per 0.1 L of air (diameter threshold selected). */
    //% block="particle count per 0.1L %eOption"
    //% weight=95
    export function particleNumber(eOption: MyEnum1): number {
        let buffer = readReg(eOption, 2);
        return (buffer[0] << 8) | buffer[1];
    }

    /** Firmware version byte from register 0x1D. */
    //% block="read version"
    //% weight=93
    export function readVersion(): number {
        let buffer = readReg(0x1D, 1);
        return buffer[0];
    }

    /** Same read sequence as the old, working Tangjie133 extension.
     *  IMPORTANT: no repeated-start flag is passed, to preserve behavior.
     */
    function readReg(reg: number, len: number): Buffer {
        pins.i2cWriteNumber(I2CAddr, reg, NumberFormat.Int8LE);
        return pins.i2cReadBuffer(I2CAddr, len);
    }
}
