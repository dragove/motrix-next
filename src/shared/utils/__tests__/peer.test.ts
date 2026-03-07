/** @fileoverview Tests for peer identification and bitfield parsing utilities. */
import { describe, it, expect } from 'vitest'
import { peerIdParser, bitfieldToPercent, bitfieldToGraphic } from '../peer'

describe('peerIdParser', () => {
  it('parses Azureus-style peer ID', () => {
    expect(peerIdParser('-AZ5750-abcdefghijkl')).toContain('Azureus')
  })

  it('parses qBittorrent peer ID', () => {
    expect(peerIdParser('-qB4250-abcdefghijkl')).toContain('qBittorrent')
  })

  it('parses Transmission peer ID', () => {
    expect(peerIdParser('-TR3000-abcdefghijkl')).toContain('Transmission')
  })

  it('returns Unknown for empty string', () => {
    expect(peerIdParser('')).toContain('unknown')
  })

  it('returns Unknown for unrecognized client', () => {
    expect(peerIdParser('-ZZ1234-abcdefghijkl')).toContain('unknown')
  })

  it('returns Unknown for UNKNOWN_PEERID constant', () => {
    expect(peerIdParser('0000000000000000000000000000000000000000')).toContain('unknown')
  })
})

describe('bitfieldToPercent', () => {
  it('returns 0 for empty bitfield', () => {
    expect(bitfieldToPercent('')).toBe('0')
  })

  it('returns 100 for full bitfield', () => {
    expect(bitfieldToPercent('ff')).toBe('100')
  })

  it('returns 50 for half bitfield', () => {
    const result = parseInt(bitfieldToPercent('f0'), 10)
    expect(result).toBe(50)
  })

  it('returns 0 for zero bitfield', () => {
    expect(bitfieldToPercent('00')).toBe('0')
  })
})

describe('bitfieldToGraphic', () => {
  it('returns empty for empty input', () => {
    expect(bitfieldToGraphic('')).toBe('')
  })

  it('returns graphic blocks for valid bitfield', () => {
    const result = bitfieldToGraphic('ff')
    expect(result.length).toBeGreaterThan(0)
  })
})
