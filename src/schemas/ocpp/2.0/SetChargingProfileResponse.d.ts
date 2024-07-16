/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Returns whether the Charging Station has been able to process the message successfully. This does not guarantee the schedule will be followed to the letter. There might be other constraints the Charging Station may need to take into account.
 *
 */
export type ChargingProfileStatusEnumType = "Accepted" | "Rejected";

export interface SetChargingProfileResponse {
  customData?: CustomDataType;
  status: ChargingProfileStatusEnumType;
  statusInfo?: StatusInfoType;
}
/**
 * This class does not get 'AdditionalProperties = false' in the schema generation, so it can be extended with arbitrary JSON properties to allow adding custom data.
 */
export interface CustomDataType {
  vendorId: string;
  [k: string]: unknown;
}
/**
 * Element providing more information about the status.
 *
 */
export interface StatusInfoType {
  customData?: CustomDataType;
  /**
   * A predefined code for the reason why the status is returned in this response. The string is case-insensitive.
   *
   */
  reasonCode: string;
  /**
   * Additional text to provide detailed information.
   *
   */
  additionalInfo?: string;
}
