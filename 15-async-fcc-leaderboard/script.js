const forumLatest = "https://forum-proxy.freecodecamp.rocks/latest"
const forumTopicUrl = "https://forum.freecodecamp.org/t/"
const forumCategoryUrl = "https://forum.freecodecamp.org/c/"
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp"

const postsContainer = document.getElementById("posts-container");
const allCategories = {
    299: { category: "Career Advice", className: "career" },
    409: { category: "Project Feedback", className: "feedback" },
    417: { category: "freeCodeCamp Support", className: "support" },
    421: { category: "JavaScript", className: "javascript" },
    423: { category: "HTML - CSS", className: "html-css" },
    424: { category: "Python", className: "python" },
    432: { category: "You Can Do This!", className: "motivation" },
    560: { category: "Backend Development", className: "backend" },
};

const forumCategory = (id) => {
    let selectedCategory = {};

    if (allCategories.hasOwnProperty(id)) {
        const { className, category } = allCategories[id];
        selectedCategory.className = className;
        selectedCategory.category = category;
    } else {
        selectedCategory.className = "general"
        selectedCategory.category = "General";
        selectedCategory.id = 1;
    }

    const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`;
    const linkText = selectedCategory.category;
    const linkClass = `category ${selectedCategory.className}`;
    return `<a href="${url}" class="${linkClass}" target="_blank">${linkText}</a>`;
};

const timeAgo = (time) => {
    const currentTime = new Date();
    const lastPost = new Date(time);
    const timeDifference = currentTime - lastPost;
    const msPerMinute = 60 * 1000;
    const minutesAgo = Math.floor(timeDifference / msPerMinute);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(monthsAgo / 12);

    if (yearsAgo >= 1) {
        return `${yearsAgo}y ago`;
    } else if (monthsAgo >= 1) {
        return `${monthsAgo}mon ago`;
    } else if (daysAgo >= 1) {
        return `${daysAgo}d ago`;
    } else if (hoursAgo >= 1) {
        return `${hoursAgo}h ago`;
    } else {
        return `${minutesAgo}m ago`;
    }
}

const viewCount = (views) => {
    const thousands = Math.floor(views / 1000);
    return views >= 1000 ? `${thousands}k` : views;
};

const avatars = (posters, users) => {
    return posters.map((poster) => {
        const user = users.find((user) => user.id === poster.user_id);
        if (user) {
            const avatar = user.avatar_template.replace(/{size}/, 30);
            const userAvatarUrl = avatar.startsWith("/user_avatar/")
                ? avatarUrl.concat(avatar)
                : avatar;
            return `<img src="${userAvatarUrl}" alt="${user.name}" />`;
        }
    }).join("");
};

const fetchData = async () => {
    try {
        const response = await fetch(forumLatest);
        const data = await response.json();
        showLatestPosts(data);
    } catch (error) {

    }
}

fetchData();

const showLatestPosts = (data) => {
    const { topic_list, users } = data;
    const { topics } = topic_list;

    postsContainer.innerHTML = topics.map((item) => {
        const {
            id,
            title,
            views,
            posts_count,
            slug,
            posters,
            category_id,
            bumped_at,
        } = item;

        return `
        <tr>
            <td>
                <a class="post-title" href="${forumTopicUrl}${slug}/${id}" target="blank">${title}</a>
                ${forumCategory(category_id)}
            </td>
            <td>
                <div class="avatar-container">${avatars(posters, users)}</div>
            </td>
            <td>${posts_count - 1}</td>
            <td>${viewCount(views)}</td>
            <td>${timeAgo(bumped_at)}</td>
        </tr>`;
    }).join("");
};
