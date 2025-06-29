CXX = em++
CC = emcc

# Surely there is a better way do this...
SRCS = $(wildcard src/*.cc) \
	deps/free42/common/shell_spool.cc deps/free42/common/core_main.cc deps/free42/common/core_commands1.cc deps/free42/common/core_commands2.cc \
	deps/free42/common/core_commands3.cc deps/free42/common/core_commands4.cc deps/free42/common/core_commands5.cc \
	deps/free42/common/core_commands6.cc deps/free42/common/core_commands7.cc deps/free42/common/core_display.cc deps/free42/common/core_globals.cc \
	deps/free42/common/core_helpers.cc deps/free42/common/core_keydown.cc deps/free42/common/core_linalg1.cc deps/free42/common/core_linalg2.cc \
	deps/free42/common/core_math1.cc deps/free42/common/core_math2.cc deps/free42/common/core_phloat.cc deps/free42/common/core_sto_rcl.cc \
	deps/free42/common/core_tables.cc deps/free42/common/core_variables.cc

# Copied deps/free42/common/from free42 makefile
CFLAGS += -Wall \
	 -Wno-parentheses \
	 -Wno-sign-compare \
	 -Wno-format-truncation \
	 -Wno-unknown-pragmas \
	 -DDECIMAL_CALL_BY_REFERENCE=1 \
	 -DDECIMAL_GLOBAL_ROUNDING=1 \
	 -DDECIMAL_GLOBAL_ROUNDING_ACCESS_FUNCTIONS=1 \
	 -DDECIMAL_GLOBAL_EXCEPTION_FLAGS=1 \
	 -DDECIMAL_GLOBAL_EXCEPTION_FLAGS_ACCESS_FUNCTIONS=1 \
	 -DHAVE_SINCOS=1 \
	 -fno-exceptions \
	 -fno-rtti \
	 -D_WCHAR_T_DEFINED \
	 -DBCD_MATH \
	 -DEMSCRIPTEN \
	 -O2

EMSCRIPTEN_FLAGS = -s EXPORTED_FUNCTIONS='["_main","_malloc","_free"]' \
                   -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \
                   -s MODULARIZE=1 \
                   -s EXPORT_NAME="Free42" \
                   -s ENVIRONMENT=web \
                   -s FILESYSTEM=0 \

libbid:
	mkdir -p out
	tar xvfz deps/free42/inteldecimal/IntelRDFPMathLib20U1.tar.gz -C out
	cd out/IntelRDFPMathLib20U1/LIBRARY; \
	    patch makefile.iml_head < ../../../intel-lib-emscripten.patch; \
	    make CC=emcc EMSCRIPTEN=1 CALL_BY_REF=1 GLOBAL_RND=1 GLOBAL_FLAGS=1 UNCHANGED_BINARY_FLAGS=0; \
		cp libbid.a ../..

build: libbid
	mkdir -p out
	$(CXX) $(CFLAGS) $(EMSCRIPTEN_FLAGS) -o out/main.js out/libbid.a $(SRCS)

clean:
	rm -rf out
