import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import BuyCoverageButton from '../components/BuyCoverageButton'

test('BuyCoverageButton renders correctly', () => {
  render(<BuyCoverageButton />)
  // Assuming the button text contains "Coverage" or similar
  const button = screen.getByRole('button', { name: /coverage/i })
  expect(button).toBeDefined()
})
