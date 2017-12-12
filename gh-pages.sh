##### Make sure working tree clean
git diff-index --quiet HEAD --
if [ $? == 1 ];
then
    echo 'Cannot publish gh-pages because working tree is dirty.'
    exit 1
fi


##### Remove untracked files/directories and switch to master branch
git clean -qdf
git checkout -q master


##### Generate new build directory and stash it in the parent
gulp >/dev/null
rm -fdr ../tmp-build-dirs; mkdir ../tmp-build-dirs
grep -v "/\[0-9]*" .gitignore > tmp.gitignore; mv tmp.gitignore .gitignore
mv $(git status -s | grep '??.*/' | sed -e 's:^?? ::' -e 's:/$::') ../tmp-build-dirs
cp index.html ../tmp-build-dirs
cp -R demo ../tmp-build-dirs/demo
cp -R doc ../tmp-build-dirs/doc
git reset --hard --quiet

##### Get remote gh-pages if there is one; otherwise create it
if [ $(git branch --list gh-pages | wc -l) == 1 ]; then git branch -qD gh-pages; fi
git fetch -q origin gh-pages 2>/dev/null
if [ $(git branch --list --remote origin/gh-pages | wc -l) == 1 ]
then
    git checkout -q origin/gh-pages
    git pull -q origin gh-pages
    git checkout -qb gh-pages
else
    # no remote branch so create based on master
    git checkout -qb gh-pages

    # remove all files and directories other than the /node_modules/ and .* directories
    rm $(ls -Ap | grep -v /) # non-dirs (because no trailing slash)
    rm -fdr $(ls -Ap | grep / | grep -v '^\..*/$' | grep -v '^node_modules/$') 2>/dev/null # other dirs
fi


##### Unstash the new build directory and add all to index
mv ../tmp-build-dirs/* .
rm -d ../tmp-build-dirs
echo node_modules > .gitignore; ls -Ap | grep / | grep '^\..*/$' >> .gitignore # ignore excepted dirs
git add .
git rm -q --cached .gitignore # we don't want to push .gitignore


##### Commit build directory with msg 'added x.x.x/build' and push it

git commit -qm "added $(git status -s | egrep -m1 '^A +\d' | sed -e 's:A  ::' -e 's:/.*::')/build"
git push -qu origin gh-pages


##### Clean up
git add .gitignore # restore so excepted dirs won't be deleted by clean:
git clean -qdf
git reset --hard --quiet # remove edited .gitignore for good now

git checkout -q master
git submodule update --init --recursive
