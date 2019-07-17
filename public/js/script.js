$(document).ready(function() {

  setTimeout(function() {
    location.reload();
  },300000)

  $.get("/api/data", display);
  var x = $("<div class='popup'><span id='calpop'>CALENDAR</span></div>")
  function display(data) {
    for (var i = 0; i < data.length; i++) {
      var p = $("<button>");
      p.addClass("btn");
      p.addClass("popup")
      p.attr("state", data[i].status);
      p.attr("id", data[i].id);
      p.append(data[i].name);
      var x = $("<span>")
      p.append(x)
      x.attr("id", "cal"+data[i].id)
      if (data[i].status === 1) {
        p.addClass("btn-success");
      } else if (data[i].status === 0) {
        p.addClass("btn-danger");
      } else if (data[i].status === 2) {
        p.addClass("btn-secondary");
      }
      $("#target").append(p);
    }
  }

  $(document).on("click", ".btn", change);

  function change() {
    if ($("#" + this.id).attr("state") == 0) {
      var updateStatus = {};
      $("#" + this.id).attr("state", 1);
      $("#" + this.id).removeClass("btn-danger");
      $("#" + this.id).addClass("btn-success");
      updateStatus.id = this.id;
      updateStatus.status = parseInt($("#" + this.id).attr("state"));
      update(updateStatus);
      console.log(updateStatus);
    } else if ($("#" + this.id).attr("state") == 1) {
      var updateStatus = {};
      $("#" + this.id).attr("state", 0);
      $("#" + this.id).removeClass("btn-success");
      $("#" + this.id).addClass("btn-danger");
      updateStatus.id = this.id;
      updateStatus.status = parseInt($("#" + this.id).attr("state"));
      update(updateStatus);
      console.log(updateStatus);
    } else if ($("#" + this.id).attr("state") == 2) {
      var updateStatus = {};
      $("#" + this.id).attr("state", 1);
      $("#" + this.id).removeClass("btn-secondary");
      $("#" + this.id).addClass("btn-success");
      updateStatus.id = this.id;
      updateStatus.status = parseInt($("#" + this.id).attr("state"));
      update(updateStatus);
      console.log(updateStatus);
    }
  }

  

  $(document).on("dblclick", ".btn", function() {
    $("#myModal").modal("show")
    
    var updateStatus = {};
    $("#" + this.id).attr("state", 2);
    $("#" + this.id).removeClass("btn-success");
    $("#" + this.id).removeClass("btn-danger");
    $("#" + this.id).addClass("btn-secondary");
    updateStatus.id = this.id;
    updateStatus.status = parseInt($("#" + this.id).attr("state"));
    update(updateStatus);
    console.log(updateStatus);
  });

  function update(x) {
    $.ajax({
      method: "PUT",
      url: "/api/data",
      data: x
    });
  }
});
