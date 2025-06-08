import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (value: number, exponent?: number): string => {
  if (exponent !== undefined) {
    return `${value.toFixed(2)} × 10${exponent.toString().sup()}`
  }
  return value.toFixed(2)
}

export const formatTime = (value: number): string => {
  return value.toFixed(2)
}

export const formatMass = (massValue: number, massExponent: number): string => {
  return `${formatNumber(massValue)} × 10${massExponent.toString().sup()} kg`
}

export const formatRadius = (radius: number): string => {
  return `${formatNumber(radius)} km`
}

export const formatOrbitalPeriod = (period: number): string => {
  return `${formatTime(period)} days`
}

export const formatRotationPeriod = (period: number): string => {
  return `${formatTime(period)} hours`
} 