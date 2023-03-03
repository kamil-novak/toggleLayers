import { ImmutableObject } from 'seamless-immutable'

export interface Config {
  title: string
  serviceId: string
  excludedSublayers: string[]
}

export type IMConfig = ImmutableObject<Config>
