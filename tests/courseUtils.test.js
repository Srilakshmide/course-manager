import { test, expect } from '@jest/globals'

function formatTags(tags) {
    return tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)
}

test('formats tags correctly', () => {
    const result = formatTags('react, nextjs,  mongodb ')
    expect(result).toEqual(['react', 'nextjs', 'mongodb'])
})
