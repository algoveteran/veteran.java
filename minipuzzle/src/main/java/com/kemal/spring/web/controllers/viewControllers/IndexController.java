package com.kemal.spring.web.controllers.viewControllers;

import com.kemal.spring.domain.User;
import com.kemal.spring.service.UserService;
import com.kemal.spring.web.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.WebRequest;

/**
 * Created by Keno&Kemo on 30.09.2017..
 */

@Controller
@RequestMapping("")
public class IndexController {

    @Autowired
    UserService userService;

    @GetMapping(value = {"/", "/index"})
    public String index (){
        return "website/index";
    }

    @GetMapping(value = {"/game/image-puzzle"})
    public String imagePuzzle (){
        return "website/image-puzzle";
    }

    @GetMapping(value = {"/game/memory"})
    public String memory (){
        return "website/memory";
    }

    @GetMapping(value = {"/game/unblock-me"})
    public String unblockMe (){
        return "website/unblock-me";
    }

    @GetMapping(value = {"/game/tangram"})
    public String tangram (){
        return "website/tangram";
    }

    @GetMapping(value = {"/game/mini-maze"})
    public String miniMaze (){
        return "website/mini-maze";
    }

    @GetMapping(value = {"/game/connect"})
    public String connect (){
        return "website/connect";
    }
    @GetMapping(value = "/login")
    public String login (){
        return "website/login";
    }

    @GetMapping(value = "/register")
    public String showRegistrationForm(WebRequest request, Model model) {
        UserDto userDto = new UserDto();
        model.addAttribute("userDto", userDto);
        return "website/register";
    }

    @GetMapping(value = "/leaderboard/{name}")
    public String leaderboard(@PathVariable String name, Model model) {
        User user = userService.findByUsername(name);
        model.addAttribute("user", user);
        return "website/leaderboard";
    }
}
