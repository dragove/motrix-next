/** @fileoverview Tests for tracker data conversion utilities. */
import { describe, it, expect } from 'vitest'
import { convertTrackerDataToLine, convertTrackerDataToComma, reduceTrackerString } from '../tracker'

describe('convertTrackerDataToLine', () => {
  it('joins array with \\r\\n newlines', () => {
    expect(convertTrackerDataToLine(['a', 'b', 'c'])).toBe('a\r\nb\r\nc')
  })

  it('returns empty for empty array', () => {
    expect(convertTrackerDataToLine([])).toBe('')
  })

  it('strips empty lines between entries', () => {
    expect(convertTrackerDataToLine(['a', '', 'b'])).toBe('a\r\nb')
  })

  it('strips whitespace-only lines', () => {
    expect(convertTrackerDataToLine(['a', '   ', 'b'])).toBe('a\r\nb')
  })
})

describe('convertTrackerDataToComma', () => {
  it('joins array with commas', () => {
    expect(convertTrackerDataToComma(['a', 'b'])).toBe('a,b')
  })

  it('returns empty for empty array', () => {
    expect(convertTrackerDataToComma([])).toBe('')
  })
})

describe('reduceTrackerString', () => {
  it('returns full string when under limit', () => {
    expect(reduceTrackerString('short')).toBe('short')
  })

  it('returns empty for empty string', () => {
    expect(reduceTrackerString('')).toBe('')
  })

  it('returns empty for no argument', () => {
    expect(reduceTrackerString()).toBe('')
  })
})
