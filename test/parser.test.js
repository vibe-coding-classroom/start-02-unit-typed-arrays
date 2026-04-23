import assert from 'node:assert';
import { encodeMotorSpeed, decodeSensorData } from '../parser.js';

console.log('🚀 Starting Unit 02 Parser Tests...\n');

// Test Case 1: Motor Encoding
try {
    console.log('Testing encodeMotorSpeed...');
    const buffer = encodeMotorSpeed(100, 200);
    const view = new Uint8Array(buffer);
    
    assert.strictEqual(buffer.byteLength, 2, 'Buffer should be 2 bytes long');
    assert.strictEqual(view[0], 100, 'Byte 0 should be 100');
    assert.strictEqual(view[1], 200, 'Byte 1 should be 200');
    console.log('✅ encodeMotorSpeed passed!');
} catch (err) {
    console.error('❌ encodeMotorSpeed failed:', err.message);
}

// Test Case 2: Motor Encoding Clamping
try {
    console.log('\nTesting encodeMotorSpeed clamping...');
    const buffer = encodeMotorSpeed(-10, 300);
    const view = new Uint8Array(buffer);
    
    assert.strictEqual(view[0], 0, 'Negative values should clamp to 0');
    assert.strictEqual(view[1], 255, 'Values > 255 should clamp to 255');
    console.log('✅ encodeMotorSpeed clamping passed!');
} catch (err) {
    console.error('❌ encodeMotorSpeed clamping failed:', err.message);
}

// Test Case 3: Sensor Decoding (Big-Endian)
try {
    console.log('\nTesting decodeSensorData (Big-Endian)...');
    const buffer = new Uint8Array([0x03, 0xE8]).buffer; // 1000 in hex
    const val = decodeSensorData(buffer, false);
    
    assert.strictEqual(val, 1000, '0x03E8 in Big-Endian should be 1000');
    console.log('✅ decodeSensorData (Big-Endian) passed!');
} catch (err) {
    console.error('❌ decodeSensorData (Big-Endian) failed:', err.message);
}

// Test Case 4: Sensor Decoding (Little-Endian)
try {
    console.log('\nTesting decodeSensorData (Little-Endian)...');
    const buffer = new Uint8Array([0xE8, 0x03]).buffer; // 1000 in hex (LE)
    const val = decodeSensorData(buffer, true);
    
    assert.strictEqual(val, 1000, '0xE803 in Little-Endian should be 1000');
    console.log('✅ decodeSensorData (Little-Endian) passed!');
} catch (err) {
    console.error('❌ decodeSensorData (Little-Endian) failed:', err.message);
}

console.log('\n🏁 Tests completed.');
