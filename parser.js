/**
 * Binary Data Parser for Motor Control and Sensor Data
 * Unit 02: Typed Arrays & Endianness
 */

/**
 * Task 1: Binary Encoder Lab
 * Encapsulates left and right motor speeds into a 2-byte ArrayBuffer.
 * 
 * @param {number} left - Left motor speed (0-255)
 * @param {number} right - Right motor speed (0-255)
 * @returns {ArrayBuffer} - A 2-byte buffer containing [left, right]
 */
export function encodeMotorSpeed(left, right) {
    // 1. Create a 2-byte ArrayBuffer
    const buffer = new ArrayBuffer(2);
    
    // 2. Create a Uint8Array view of the buffer
    const view = new Uint8Array(buffer);
    
    // 3. Clamp values to 0-255 range and store them
    // Hint: Using Math.min(Math.max(val, 0), 255) or Uint8ClampedArray
    view[0] = Math.min(Math.max(left, 0), 255);
    view[1] = Math.min(Math.max(right, 0), 255);
    
    return buffer;
}

/**
 * Task 2: Data Decoder & Endianness Lab
 * Decodes a 16-bit sensor value from an ArrayBuffer using DataView.
 * 
 * @param {ArrayBuffer} buffer - The buffer containing sensor data (at least 2 bytes)
 * @param {boolean} isLittleEndian - Whether to use Little-Endian byte order
 * @returns {number} - The decoded 16-bit unsigned integer
 */
export function decodeSensorData(buffer, isLittleEndian = false) {
    if (buffer.byteLength < 2) {
        throw new Error("Buffer too short for 16-bit sensor data");
    }

    // 1. Create a DataView for the buffer
    const view = new DataView(buffer);
    
    // 2. Read a 16-bit unsigned integer (Uint16) from byte offset 0
    // The second parameter of getUint16 determines the endianness
    const value = view.getUint16(0, isLittleEndian);
    
    return value;
}

/**
 * Utility: Converts ArrayBuffer to Hex String for preview
 * @param {ArrayBuffer} buffer 
 * @returns {string[]} - Array of hex strings for each byte
 */
export function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0').toUpperCase());
}

/**
 * Utility: Converts ArrayBuffer to Binary String for preview
 * @param {ArrayBuffer} buffer 
 * @returns {string[]} - Array of binary strings for each byte
 */
export function bufferToBinary(buffer) {
    return Array.from(new Uint8Array(buffer)).map(b => b.toString(2).padStart(8, '0'));
}
