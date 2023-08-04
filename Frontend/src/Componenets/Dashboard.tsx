import SnippetCard from "./SnippetCard";

export default function Dashboard(){
    return(
        <div className="dashboard-container">
            <div className="greeting">
                <div className="text">Welcome user</div>
                <div className="name">Display Name</div>
                <div className="brief">
                    <div>Total snippets : 10</div>
                    <div>
                        <div className="lang">Languages</div>
                        <div className="langs">
                            <span>C</span>
                            <span>C++</span>
                            <span>Python</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="snippet-list">
                <SnippetCard>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime eum illum assumenda incidunt! Animi odit consequatur veniam illum maxime neque eius omnis vitae aliquid esse ut totam ipsam blanditiis autem in, nesciunt nostrum ad excepturi repellendus sed eum voluptatum rerum dolores nihil? Quis molestiae omnis a, sed itaque sequi excepturi!
                </SnippetCard>

                <SnippetCard>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, mollitia.
                </SnippetCard>

                <SnippetCard>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid nemo dolorem harum necessitatibus sit iusto deleniti ab, ea corrupti, fuga laboriosam saepe! Mollitia ducimus neque perferendis voluptatum nesciunt corrupti temporibus.
                </SnippetCard>

                <SnippetCard>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates exercitationem ipsum accusantium eveniet temporibus at doloribus dignissimos molestiae magnam odio voluptatum, maxime, unde cum. Molestiae, fugit libero deleniti accusantium maiores harum ducimus accusamus doloribus veniam eos quasi dolorem nemo animi distinctio optio cumque impedit nulla ipsa placeat natus sunt suscipit modi. Dolores sapiente, consectetur corrupti magnam inventore iste velit impedit minus fugit suscipit placeat voluptas molestiae molestias repellat consequuntur nisi ipsa accusamus debitis architecto reprehenderit! Repellat quasi quas iste molestias qui! Vel laudantium ipsum molestiae similique explicabo nostrum quas repellendus atque. Officia blanditiis quaerat numquam magni vitae eaque enim minima!
                </SnippetCard>
            </div>
        </div>
    )
}