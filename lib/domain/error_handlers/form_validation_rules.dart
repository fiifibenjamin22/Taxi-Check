import 'package:flutter/material.dart';

class FormValidationRules {
  String? fullNameValidator(value) {
    return value.isEmpty ? "Full name required" : null;
  }

  String? emailValidator(value) {
    return value.isEmpty ? "Email required" : null;
  }

  String? phoneValidator(String value) {
    return value.isEmpty || value.length != 9 ? "Enter a valid phone number" : null;
  }

  String? passwordValidator(value) {
    return value.isEmpty ? "Password required" : null;
  }

  String? confirmPassword(pass, value) {
    return pass == value ? null : "Passwords do not match";
  }

  String? notNullField(String value) {
    return value.isEmpty ? "Field is required": null;
  }

  String? emailOrPhoneValidator(String value) {
    return value.isEmpty ? "Field is required": null;
  }

  String? hazardTypeValidator(String value, bool hasHazardousSubstance) {
    if(hasHazardousSubstance) return value.isEmpty ? "Field is required": null;
    else return null;
  }

  bool validate(GlobalKey<FormState> key) {
    return key.currentState!.validate();
  }

}
