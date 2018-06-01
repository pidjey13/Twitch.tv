var channels = [
	"ESL_SC2",
	"OgamingSC2",
	"cretetion",
	"freecodecamp",
	"RobotCaleb",
	"noobs2ninjas"
];
var ID = "3lmbq082dcz3uirj00zo1bdc71yuf8";

$(document).ready(function () {
	$("#all").css("background-color", "#000000");

	onOrOff();

	$("#all").click(function () {
		$(".cornice").each(function () {
			$(this).show();
		});
	});

	$("#online").click(function () {
		$(".cornice").each(function () {
			if ($(this).hasClass("offline")) {
				$(this).hide();
			} else if ($(this).hasClass("online")) {
				$(this).show();
			}
		});
	});

	$("#offline").click(function () {
		$(".cornice").each(function () {
			if ($(this).hasClass("online")) {
				$(this).hide();
			} else if ($(this).hasClass("offline")) {
				$(this).show();
			}
		});
	});
});

function onOrOff() {
	$.each(channels, function (element) {
		$.ajax({
			url:
				"https://api.twitch.tv/kraken/streams/" +
				channels[element] +
				"?client_id=" +
				ID +
				"&callback=?",
			dataType: "jsonp",
			headers: {
				"Client-ID": ID
			},
			success: function (data) {
				if (data.stream === null) {
					$.getJSON(
						"https://wind-bow.gomix.me/twitch-api/channels/" +
						channels[element] +
						"?callback=?",
						function (data) {
							$(".filaTV").append(
								"<div class='cornice offline'><div class='tv' style='background-image:url(" +
								data.profile_banner +
								");'><a href=" +
								data.url +
								" target='_blank'><img class='img-circle' src=" +
								data.logo +
								"></a><p id='followers'>" +
								data.followers +
								"<i class='fa fa-users' style='margin-left: 10px' aria-hidden='true'></i></p></div></div>"
							);
						}
					);
				} else {
					$(".filaTV").append(
						"<div class='cornice online'><div class='tv' style='background-image:url(" +
						data.stream.channel.profile_banner +
						");'><a href=" +
						data.stream.channel.url +
						" target='_blank'><img class='img-circle' src=" +
						data.stream.channel.logo +
						"></a><p id='followers'>" +
						data.stream.channel.followers +
						"<i class='fa fa-users' style='margin-left: 10px' aria-hidden='true'></i></p></div></div>"
					);
				}
			}
		});
	});
}

$(".nav li").click(function () {
	if ($(this).is("#all")) {
		$(this).css("background-color", "#000000");
		$("#online").css("background-color", "transparent");
		$("#offline").css("background-color", "transparent");
	} else if ($(this).is("#online")) {
		$(this).css("background-color", "#6AAD53");
		$("#all").css("background-color", "transparent");
		$("#offline").css("background-color", "transparent");
	} else {
		$(this).css("background-color", "#DE0B0B");
		$("#all").css("background-color", "transparent");
		$("#online").css("background-color", "transparent");
	}
});
