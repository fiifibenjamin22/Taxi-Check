import 'package:url_launcher/url_launcher.dart';

class PhoneUtils {
  static Future<void> sendSMS(String phone) async {
    final uri = 'sms:$phone';

    if (await canLaunch(uri))
      await launch(uri);
    else
      throw 'Could not launch $uri';
  }

  static Future<void> makePhoneCall(String phone) async {
    final uri = 'tel:$phone';

    if (await canLaunch(uri))
      await launch(uri);
    else
      throw 'Could not launch $uri';
  }
}
