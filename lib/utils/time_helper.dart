

import 'package:intl/intl.dart';

class TimeHelper {
  static String greeter() {
    var timeNow = DateTime.now().hour;

    if (timeNow <= 12) {
      return 'Good Morning';
    } else if ((timeNow > 12) && (timeNow <= 16)) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  static String timeAgoSinceDate(String dateString, {bool numericDates = true}) {
    DateTime notificationDate = DateTime.parse(dateString);
    final date2 = DateTime.now();
    final difference = date2.difference(notificationDate);

    if (difference.inDays > 8) {
      return dateString;
    } else if ((difference.inDays / 7).floor() >= 1) {
      return '1w';
    } else if (difference.inDays >= 2) {
      return '${difference.inDays}d';
    } else if (difference.inDays >= 1) {
      return '1d';
    } else if (difference.inHours >= 2) {
      return '${difference.inHours}h';
    } else if (difference.inHours >= 1) {
      return '1h';
    } else if (difference.inMinutes >= 2) {
      return '${difference.inMinutes}m';
    } else if (difference.inMinutes >= 1) {
      return '1m';
    } else if (difference.inSeconds >= 3) {
      return '${difference.inSeconds}s';
    } else {
      return 'now';
    }
  }
}
